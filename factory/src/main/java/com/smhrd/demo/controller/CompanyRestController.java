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


	 // 회사명 목록 가져오기 API
    @GetMapping("/api/companies") // AJAX URL과 일치하도록 수정
    public List<CompanyModel> getAllCompanies() {
        return service.getAllCompanies();


	 }
}


			
		
