package com.smhrd.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smhrd.demo.model.ClipModel;
import java.util.List;
import java.sql.Timestamp;
import java.time.LocalDate;


@Repository
public interface ClipRepository extends JpaRepository <ClipModel, Long > {
	
	  @Query("SELECT c FROM ClipModel c WHERE DATE(c.createdAt) = DATE(:date)")
	    List<ClipModel> findByCreatedAtDate(Timestamp date);

	

}
