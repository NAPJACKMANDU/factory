package com.smhrd.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.model.SafetyRulesModel;
import com.smhrd.demo.repo.SafetyRulesRepository;

import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.HttpSession;

@Service
public class SafetyRulesService {

	@Autowired
	SafetyRulesRepository rep ;
	
		public void safetyRulesdata(SafetyRulesModel safety, HttpSession session) {
		FactoryMember member = (FactoryMember)session.getAttribute("member") ;
		safety.setCompanyIdx(member.getCompanyIdx()) ;
			rep.save(safety) ;
		}

		public List<SafetyRulesModel> getAllSafetyRules() {
			return rep.findAll();
		}



}
