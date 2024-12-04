package com.smhrd.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VideoController {

	 @GetMapping("/d")
	    public String webcamStreamPage1() {
	        return "webcam_desktop";  // JSP 페이지로 이동
	    }	
	    
	    @GetMapping("/n")
	    public String webcamStreamPage2() {
	        return "webcam_notebook";  // JSP 페이지로 이동
	    }
}

