package com.smhrd.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.smhrd.demo.model.SafetyRulesModel;
import com.smhrd.demo.service.SafetyRulesService;

@Controller
public class FactoryMainController {
	
	
	@Autowired
	SafetyRulesService service ;
	
	@GetMapping("/") // 로그인 메인페이지
	public String mainPage()
	{
		return "P02_LogIn";
	}
	
	@GetMapping("/CCTV_Monitor") // CCTV
	public String goMonitor() {
		return "CCTV_Monitor";
	}
	
	@GetMapping("/login") 
	public String BackLogin() {
		return "P02_LogIn";
	}
	
	@GetMapping("/P03_Join") // 회원가입하는 창
	public String join() {
		return "P03_Join" ;
	}	
	
	@GetMapping("/P00_findAccount") // 아이디/비번 찾기 
	public String findAccount() {
		return "P00_findAccount" ;
	}
	
	@GetMapping("/mod_Info")
	public String mod_Info() {
		return "mod_Info" ;
	}
	
	@GetMapping("/SafetyRules")
	public String getAllCall(Model model) {
        List<SafetyRulesModel> list = service.getAllSafetyRules();
	    model.addAttribute("list", list);  // 데이터를 모델에 추가
 	    System.out.println("list : "+ model);
	    return "SafetyRules";  
	}

}
