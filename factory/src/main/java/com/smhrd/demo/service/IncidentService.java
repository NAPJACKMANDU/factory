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
		
		// Timestamp 생성 시 24시간 형식을 사용하도록 수정

		String dateString = String.format("%d-%02d-%02d 00:00:00", year, month, day);
		System.out.println("Generated date string: " + dateString);

		Timestamp date = Timestamp.valueOf(String.format("%d-%02d-%02d 00:00:00", year, month, day));

	    // 해당 날짜에 해당하는 클립 데이터 조회
	    List<ClipModel> clips = clip.findByCreatedAtDate(date);
	    System.out.println(clips);

	    List<IncidentModel> incidents = new ArrayList<>(); // IncidentModel을 저장할 리스트 생성

	    // 데이터가 있다면 리스트에 IncidentModel 추가
	    if (!clips.isEmpty()) {
	        for (ClipModel clip : clips) {
	            IncidentModel incident = Incident.findByClipIdx(clip.getClipIdx()); // 이미 존재하는 데이터를 가져오기

	            if (incident == null) {
	                // 기존 데이터가 없으면 새로운 Incident 객체 생성 및 저장
	                incident = new IncidentModel(); // 반복문 내에서 새로운 객체 생성
	                incident.setCreatedAt(clip.getCreatedAt()); // 사고 발생 시간 설정
	                incident.setYear(year);
	                incident.setMonth(month);
	                incident.setDay(day);
	                incident.setIncidentName(clip.getClipName()); // 사건 이름 클립과 같이 설정
	                incident.setIncidentPath(clip.getClipPath()); // 사건 경로 클립 패스와 같이 설정
	                incident.setClipIdx(clip.getClipIdx());
	                System.out.println(clip.getClipIdx());
	                incident.setCameraIdx(clip.getCameraIdx());
	                incident.setCompanyIdx(clip.getCompanyIdx());
	                Incident.save(incident); // incident 저장
	              
	            }
	            incidents.add(incident);  // 리스트에 incident 추가
	        }
	    }
	    System.out.println(incidents);
	    return incidents; // IncidentModel 리스트 반환
	}

	public List<IncidentModel> allinsident() {
		return Incident.findAll() ;
		
	
	}
	public String getVideoPathById(Long incidentIdx) {
	    // incidentIdx를 통해 비디오 경로를 가져오는 메서드 호출
	    return Incident.findIncidentPathById(incidentIdx);
	}

	   
	
}
