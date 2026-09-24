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
		Map<String, Curriculum> curricula = new LinkedHashMap<>();
		for (DataIndex.Entry e : index.curricula()) {
			curricula.put(e.id(), read(ctx, e.file(), Curriculum.class));
		}
		GeneralEducationFile ge = read(ctx, index.generalEducation(), GeneralEducationFile.class);
		Certification cert = read(ctx, index.certification(), Certification.class);
		Map<String, Timetable> timetables = new LinkedHashMap<>();
		for (DataIndex.TimetableEntry t : index.timetables()) {
			timetables.put(t.term(), read(ctx, t.file(), Timetable.class));
		}
		return new DataStore(index, curricula, new ArrayList<>(ge.courses()), cert, timetables);
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
