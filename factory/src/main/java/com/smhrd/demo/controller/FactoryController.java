package com.smhrd.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FactoryController {
	
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
	@GetMapping("/Join")
	public String Join() {
		return "P03_Join";
	}
}
