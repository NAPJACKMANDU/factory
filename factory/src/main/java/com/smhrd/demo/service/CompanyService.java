package com.smhrd.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.smhrd.demo.model.CompanyModel;
import com.smhrd.demo.repo.CompanyRepository;

@Service
public class CompanyService {

	@Autowired
	CompanyRepository rep ;

	public List<CompanyModel> getCompanyName() {
		return rep.findAll() ;	
	}


	    }
	


	

