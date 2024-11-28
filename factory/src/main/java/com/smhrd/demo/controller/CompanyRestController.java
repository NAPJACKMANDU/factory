package com.smhrd.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.demo.model.CompanyModel;
import com.smhrd.demo.service.CompanyService;


@RestController
public class CompanyRestController {
	
	@Autowired
	CompanyService service ;
	
	@GetMapping("/companies")
	public String Companies(Model model) {
	    List<CompanyModel> companyList = service.getCompanyName();
	    model.addAttribute("companyList", companyList); // JSP 코드와 일치하도록 이름 변경
	    return "P03_Join"; // 반환할 JSP 페이지 이름
	}

	 }





			
		
