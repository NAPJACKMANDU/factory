package com.smhrd.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.demo.repo.FactoryMemberRepository;

@Service
public class FactoryMemberService {

	@Autowired
    private FactoryMemberRepository factoryMemberRepository;

    // 아이디 중복 여부 확인 메서드
    public boolean isIdTaken(String id) {
        return factoryMemberRepository.existsById(id); // JPA 메서드로 아이디 존재 여부 확인
    }
}