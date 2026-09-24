package kr.inha.gradcheck.data;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import kr.inha.gradcheck.model.Certification;
import kr.inha.gradcheck.model.Curriculum;
import kr.inha.gradcheck.model.DataIndex;
import kr.inha.gradcheck.model.GeneralEducationCourse;
import kr.inha.gradcheck.model.Requirements;
import kr.inha.gradcheck.model.Timetable;

/**
 * 서버 시작 시 WEB-INF/data 의 JSON 을 모두 읽어 DataStore 를 만든다.
 * index.json 에 적힌 파일만 읽는다. 데이터 파일은 curriculum_data/sources/build_webapp_data.py 로 만든다.
 * 읽기에 실패해도 서버는 뜨고, API 가 503 을 돌려준다 (와이어프레임 예외 B).
 */
@WebListener
public class DataLoader implements ServletContextListener {

	static final String ATTR_STORE = DataStore.class.getName();
	static final String ATTR_ERROR = DataStore.class.getName() + ".error";
	private static final String BASE = "/WEB-INF/data/";
	private static final Gson GSON = new Gson();

	@Override
	public void contextInitialized(ServletContextEvent event) {
		ServletContext ctx = event.getServletContext();
		try {
			DataStore store = load(ctx);
			ctx.setAttribute(ATTR_STORE, store);
			ctx.log("[DataLoader] " + store.summary());
		} catch (IOException | RuntimeException e) {
			ctx.setAttribute(ATTR_ERROR, e);
			ctx.log("[DataLoader] WEB-INF/data 로딩 실패", e);
		}
	}

	static DataStore load(ServletContext ctx) throws IOException {
		DataIndex index = read(ctx, "index.json", DataIndex.class);
		require(index.curricula() != null && index.generalEducation() != null && index.certification() != null
				&& index.timetables() != null, "index.json", "curricula, generalEducation, certification, timetables");
		Map<String, Curriculum> curricula = new LinkedHashMap<>();
		for (DataIndex.Entry e : index.curricula()) {
			Curriculum c = read(ctx, e.file(), Curriculum.class);
			validate(c, e);
			curricula.put(e.id(), c);
		}
		GeneralEducationFile ge = read(ctx, index.generalEducation(), GeneralEducationFile.class);
		require(ge.courses() != null, index.generalEducation(), "courses");
		Certification cert = read(ctx, index.certification(), Certification.class);
		require(cert.englishGraduation() != null && cert.englishGraduation().criteria() != null,
				index.certification(), "englishGraduation.criteria");
		Map<String, Timetable> timetables = new LinkedHashMap<>();
		for (DataIndex.TimetableEntry t : index.timetables()) {
			Timetable tt = read(ctx, t.file(), Timetable.class);
			require(tt.sections() != null, t.file(), "sections");
			timetables.put(t.term(), tt);
		}
		return new DataStore(index, curricula, new ArrayList<>(ge.courses()), cert, timetables);
	}

	/**
	 * API 가 반드시 쓰는 항목이 빠졌으면 서버 시작 때 바로 실패시킨다 (나중에 요청마다 500 이 나는 것보다 낫다).
	 * 전공기초(majorFoundation)·일반선택(freeElective)은 학과에 따라 없을 수 있어서 검사하지 않는다.
	 */
	private static void validate(Curriculum c, DataIndex.Entry e) throws IOException {
		require(e.id().equals(c.id()), e.file(), "id 가 index.json 과 같아야 함 (" + e.id() + ")");
		require(c.courses() != null, e.file(), "courses");
		Requirements r = c.requirements();
		require(r != null, e.file(), "requirements");
		require(r.majorCredits() != null && r.majorRequired() != null && r.majorRequired().courses() != null
				&& r.generalEducationRequired() != null && r.generalEducationRequired().groups() != null,
				e.file(), "requirements.majorCredits, majorRequired.courses, generalEducationRequired.groups");
	}

	private static void require(boolean ok, String file, String what) throws IOException {
		if (!ok) {
			throw new IOException("데이터 파일 형식 오류: " + BASE + file + " — 필요한 항목: " + what);
		}
	}

	private static <T> T read(ServletContext ctx, String file, Class<T> type) throws IOException {
		try (InputStream in = ctx.getResourceAsStream(BASE + file)) {
			if (in == null) {
				throw new IOException("데이터 파일 없음: " + BASE + file);
			}
			try (Reader r = new InputStreamReader(in, StandardCharsets.UTF_8)) {
				T value = GSON.fromJson(r, type);
				if (value == null) {
					throw new IOException("빈 데이터 파일: " + BASE + file);
				}
				return value;
			}
		}
	}

	private record GeneralEducationFile(List<GeneralEducationCourse> courses) {
	}
}
