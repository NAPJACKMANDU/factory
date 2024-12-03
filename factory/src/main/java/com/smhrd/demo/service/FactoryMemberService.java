package com.smhrd.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.repo.FactoryMemberRepository;

@Service
public class FactoryMemberService {

	@Autowired
    private FactoryMemberRepository rep;

    // 아이디 중복 여부 확인 메서드
    public boolean isIdTaken(String id) {
        return rep.existsById(id); // JPA 메서드로 아이디 존재 여부 확인
    }

	public void callbyupdate(FactoryMember member) {
		// 1. 가져온 후 2. 수정하고 3. 저장하기
		Optional<FactoryMember> result = rep.findById(member.getIdx());
		
		result.get().setNote(member.getNote());
		System.out.println();
		rep.save(result.get()) ;
	}

	public List<FactoryMember> getAllCall() {
		return rep.findAll() ;
	}

	public void callbydelete(Long idx) {
	 rep.deleteById(idx);
		
	}
	
	
}