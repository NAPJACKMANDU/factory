package com.smhrd.demo.repo;

 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.demo.model.FactoryMember;

@Repository
public interface FactoryRepository extends JpaRepository<FactoryMember, String> {

	public FactoryMember findByIdAndPw(String id, String pw);
	

}
