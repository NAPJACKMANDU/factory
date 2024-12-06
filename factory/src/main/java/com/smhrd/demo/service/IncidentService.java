package com.smhrd.demo.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.demo.model.ClipModel;
import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.model.IncidentModel;
import com.smhrd.demo.repo.ClipRepository;
import com.smhrd.demo.repo.IncidentRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class IncidentService {

	
	@Autowired
	IncidentRepository Incident;

	@Autowired
	ClipRepository clip;

	public List<IncidentModel> getIncidentDetailsByDate(int year, int month, int day) {
	    // 특정 날짜를 Timestamp로 변환
	    Timestamp date = Timestamp.valueOf(String.format("%d-%02d-%02d 00:00:00", year, month, day));

	    // 해당 날짜에 해당하는 클립 데이터 조회
	    List<ClipModel> clips = clip.findByCreatedAtDate(date);
	    System.out.println(clips);

	    List<IncidentModel> incidents = new ArrayList<>(); // IncidentModel을 저장할 리스트 생성

	    // 데이터가 있다면 리스트에 IncidentModel 추가
	    if (!clips.isEmpty()) {
	        for (ClipModel clip : clips) {
	            // 특정 clipIdx가 Incident 테이블에 존재하는지 확인
	            if (!Incident.existsByClipIdx(clip.getClipIdx())) {
	                IncidentModel incident = new IncidentModel(); // 반복문 내에서 새로운 객체 생성
	                incident.setCreatedAt(clip.getCreatedAt()); // 사고 발생 시간 설정
	                incident.setYear(year);
	                incident.setMonth(month);
	                incident.setDay(day);
	                incident.setIncidentName(clip.getClipName()); // 사건 이름 클립과 같이 설정
	                incident.setIncidentPath(clip.getClipPath()); // 사건 경로 클립 패스와 같이 설정
	                incident.setClipIdx(clip.getClipIdx());
	                System.out.println(clip.getClipIdx());
	                incident.setCompanyIdx(clip.getCameraIdx());

	                incidents.add(incident); // 생성한 IncidentModel을 리스트에 추가
	                Incident.save(incident); // incident 저장
	            }
	        }
	    }

	    return incidents; // IncidentModel 리스트 반환
	}
}
