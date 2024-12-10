package com.smhrd.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.service.FactoryIdService;
import com.smhrd.demo.service.FactoryMemberService;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.server.PathParam;

@Controller
public class FactoryMemberController {
	
	@Autowired
	FactoryIdService service ;
	
	@PostMapping("/joinForm")
	public String joinMember(@ModelAttribute FactoryMember member) {
		 member.setNote(" "); // note를 명시적으로 null로 설정
		service.join(member) ;
		return "redirect:/" ;
	}

	
	@PostMapping("/LoginFrom")
	public String Login(@ModelAttribute FactoryMember member, HttpSession session) {
		FactoryMember loginMember = service.Login(member) ;
		if(loginMember != null ) {
		session.setAttribute("member" ,loginMember) ;
		System.out.println(loginMember.toString());
		return "redirect:/CCTV_Monitor" ;
		
		} else {
			return "redirect:/" ;
		}
	
	}
	
	@GetMapping("/call")
	public String AllCallbord(Model model) {
		List<FactoryMember> allcall = service.allcallbord() ;
		model.addAttribute("allcall", allcall) ;
	return "call" ;
 
	}
	
	}

