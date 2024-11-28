package com.smhrd.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	@Autowired
	FactoryIdService service ;
	
	
	@GetMapping("/") // 로그인 메인페이지
	public String mainPage()
	{
		return "P02_LogIn";
	}
	
	@GetMapping("/monitor") // CCTV
	public String goMonitor() {
		return "P04_Monitor";
	}
	
	@GetMapping("/login") 
	public String Login() {
		return "P02_LogIn";
	}
	
	@GetMapping("/P03_Join") // 회원가입하는 창
	public String join() {
		return "P03_Join" ;
	}	
	
	@GetMapping("/P00_findAccount") // 아이디/비번 찾기 
	public String findAccount() {
		return "/P00_findAccount" ;
	}
	
	@PostMapping("/joinForm") // 회원가입창
	public String joinMember(@ModelAttribute FactoryMember member)  {
		System.out.println("선택한 역할: " + member.getRole());
		System.out.println("아이디 : " + member.getId());
		service.joinMember(member);
		return "redirect:/" ;
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
