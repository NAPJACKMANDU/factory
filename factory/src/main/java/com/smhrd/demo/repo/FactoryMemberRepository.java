package com.smhrd.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smhrd.demo.model.FactoryMember;

public interface FactoryMemberRepository extends JpaRepository<FactoryMember, String> {
    boolean existsById(String id);
}