package com.smhrd.demo.service;

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
//
//	public FactoryMember LoginPopup(FactoryMember member) {
//		// select* from FactoryMember where id = ? and pw = ?
//		return rep.findByIdAndPw(member.getId(), member.getPw()) ;
//	}


	public void join(FactoryMember member) {
		rep.save(member) ;
	}
	
	}
	
	
	

