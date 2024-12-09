package com.smhrd.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.model.IncidentModel;
import com.smhrd.demo.service.IncidentService;

import jakarta.servlet.http.HttpSession;

@RestController
public class IncidentRestController {

   @Autowired
   IncidentService service;

   @PostMapping("/calendar")
   public List<IncidentModel> getIncidentDetails(@RequestBody Map<String, Integer> requestBody, HttpSession session) {
       int year = requestBody.get("year");
       int month = requestBody.get("month");
       int day = requestBody.get("day");

       // 날짜에 해당하는 사고 데이터를 조회
       List<IncidentModel> incident = service.getIncidentDetailsByDate(year, month, day);
       
       session.setAttribute("incident", incident);
       return incident;
   }
   
   
  @PostMapping("/allinsident") 
  public List<IncidentModel> allinsident(HttpSession session) {
	  List<IncidentModel> list = service.allinsident() ;
	  
	  List<IncidentModel> incidents =   (List<IncidentModel>) session.getAttribute("incident") ;
	  FactoryMember member = (FactoryMember) session.getAttribute("member") ;
	   
	  for (IncidentModel incident : incidents) {
		  if(incident.getCompanyIdx() == member.getCompanyIdx() ) {
			  return list ;
		  }
	  }
	  
	  return list ;
	 
  }
  
  @PostMapping("/getVideoPath")
  public ResponseEntity<Map<String, String>> getVideoPath(@RequestParam("incidentIdx") Long incidentiIdx) {
      String videoPath = service.getVideoPathById(incidentiIdx); // ID에 맞는 비디오 경로를 가져오는 서비스 메서드
      Map<String, String> response = new HashMap<>();
      response.put("videoPath", videoPath);
      System.out.println(videoPath);
      return ResponseEntity.ok(response);
  }

}

