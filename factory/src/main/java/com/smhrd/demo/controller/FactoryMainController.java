package com.smhrd.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class FactoryMainController {
	
	
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
	
	@GetMapping("/modInfo")
	public String modInfo() {
		return "/mod_Info" ;
	}
	
}
