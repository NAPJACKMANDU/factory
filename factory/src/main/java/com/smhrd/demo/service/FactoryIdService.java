package com.smhrd.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.repo.FactoryRepository;


@Service
public class FactoryIdService {

	@Autowired
	FactoryRepository rep ;


	public void join(FactoryMember member) {
		rep.save(member) ;
	}


	public FactoryMember Login(FactoryMember member) {
		System.out.println("아이디 비번: " + member.getId() + member.getPw());
		return rep.findByIdAndPw(member.getId(), member.getPw()) ;
		
	}
	
	
	public List<FactoryMember> allcallbord() {
		return rep.findAll() ;
 	}
	
	
	}
	
	
	

