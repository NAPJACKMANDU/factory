package com.smhrd.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.model.IncidentModel;
import com.smhrd.demo.model.SafetyRulesModel;
import com.smhrd.demo.service.SafetyRulesService;

import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.HttpSession;

@RestController
public class SafetyRulesRestController {
	
	@Autowired
	SafetyRulesService service ;
	
	
		@GetMapping("/SaftyRules")
		public List<SafetyRulesModel> getAllCall(Model model) {
			return service.getAllSafetyRules() ;
		}
	
	@PostMapping("/SafetyForm")
	public SafetyRulesModel SafetyRulesUpdate(@RequestBody SafetyRulesModel safetyRule, HttpSession session) {
	    
		// 1. 전체데이터 먼저 가져오기
	    List<SafetyRulesModel> safetyList = service.getAllSafetyRules();

	    // 2. 리스트에 이미 srTitle이 존재하는지 확인
	    for (int i = 0; i < safetyList.size(); i++) {   
	        SafetyRulesModel model = safetyList.get(i);
	        if (safetyRule.getSrTitle().equals(model.getSrTitle())) {
	            return null;  
	        }
	    }

	    // 3. srTitle이 없다면 새 데이터 저장
	    service.safetyRulesdata(safetyRule, session);
	    System.out.println(safetyRule);
	    return safetyRule;  // 저장된 데이터 반환
	}
	
}