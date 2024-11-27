package com.smhrd.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.service.FactoryIdService;

import jakarta.servlet.http.HttpSession;

@Controller
public class FactoryMemberController {
	
	FactoryIdService service ;
	
	
	@GetMapping("/")
	public String mainPage()
	{
		return "P01_Main";
	}
	@GetMapping("/monitor")
	public String goMonitor() {
		return "P04_Monitor";
	}
	@GetMapping("/login")
	public String Login() {
		return "P02_LogIn";
	}
	
	@PostMapping("/loginForm")
	public String LoginPopup(FactoryMember member,  HttpSession session ) {
		FactoryMember loginMember = service.LoginPopup(member);
		if(loginMember != null) { // 로그인 성공 (세션 - 사용자 정보)
		session.setAttribute("member", loginMember) ;
		System.out.println(loginMember.toString());
				
		}
		
		return "redirect:/";
		
	}
}
