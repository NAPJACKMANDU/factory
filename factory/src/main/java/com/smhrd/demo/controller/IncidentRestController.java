package com.smhrd.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.demo.model.IncidentModel;
import com.smhrd.demo.service.IncidentService;

import jakarta.servlet.http.HttpSession;

@RestController
public class IncidentRestController {

	@Autowired
	IncidentService service;

	@PostMapping("/calendar")
	public List<Map<String, Object>> getIncidentDetails(@RequestBody Map<String, Integer> requestBody) {
	    int year = requestBody.get("year");
	    int month = requestBody.get("month");
	    int day = requestBody.get("day");

	    // 날짜에 해당하는 사고 데이터를 조회
	    List<IncidentModel> incident = service.getIncidentDetailsByDate(year, month, day);

	    List<Map<String, Object>> responseList = new ArrayList<>();
	    Map<String, Object> response = new HashMap<>();
	    
	    if (incident != null) {
	        response.put("details", incident);
	    } else {
	        response.put("details", "데이터가 없습니다.");
	    }
	    
	    responseList.add(response); // Map을 List에 추가

	    return responseList;
	}
}
