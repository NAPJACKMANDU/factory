package com.smhrd.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.repo.FactoryRepository;


@Service
public class FactoryIdService {

	@Autowired
	FactoryRepository rep ;

	public FactoryMember LoginPopup(FactoryMember member) {
		// select* from FactoryMember where id = ? and pw = ?
		return rep.findByIdAndPw(member.getId(), member.getPw()) ;
	}

	public void joinMember(FactoryMember member) {
		System.out.println(member);
		rep.save(member) ;
		
	}
	
	
	
}
