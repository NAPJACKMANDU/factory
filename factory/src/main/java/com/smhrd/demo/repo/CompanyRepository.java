package com.smhrd.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.demo.model.CompanyModel;


@Repository
public interface CompanyRepository  extends JpaRepository<CompanyModel, Integer > {
	

 
	
	
}



