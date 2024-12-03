package com.smhrd.demo.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smhrd.demo.model.FactoryMember;

public interface FactoryMemberRepository extends JpaRepository<FactoryMember, Long > {
    boolean existsById(String id);
    


}