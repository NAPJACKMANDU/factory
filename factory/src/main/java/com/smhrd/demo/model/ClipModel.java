package com.smhrd.demo.model;

import java.security.Timestamp;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "tb_clip")


public class ClipModel {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clipIdx ; // 클립 식별자 
	@Column(nullable = false)
    private String clipName; // 클립 이름
	@Column(nullable = false)
    private int clipSize;     // 클립 사이즈 
    private String clipExt;     // 클립 확장자 
    private int cameraIdx; // 카메라 식별자 
    @UpdateTimestamp
    private Timestamp createdAt;  // 등록 일자 
    

}
