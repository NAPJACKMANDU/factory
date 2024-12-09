package com.smhrd.demo.model;

import java.sql.Timestamp;

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
    private Long clipIdx; // 클립 식별자 
    @Column(nullable = false)
    private String clipName; // 클립 이름 
	@Column(nullable = false)
    private Long clipSize;  // 클립 사이즈 
	@Column(nullable = false) 
    private int cameraIdx; // 카메라 식별자
    @UpdateTimestamp
    private Timestamp createdAt; // 등록 일자 
    @Column(nullable = true)
    private String clipPath; // 클립 경로 
    @Column(nullable = true)
    private int companyIdx ;
    
    
	public Long getClipIdx() {
		return clipIdx;
	}
	public void setClipIdx(Long clipIdx) {
		this.clipIdx = clipIdx;
	}
	public String getClipName() {
		return clipName;
	}
	public void setClipName(String clipName) {
		this.clipName = clipName;
	}
	public Long getClipSize() {
		return clipSize;
	}
	public void setClipSize(Long clipSize) {
		this.clipSize = clipSize;
	}
	public int getCameraIdx() {
		return cameraIdx;
	}
	public void setCameraIdx(int cameraIdx) {
		this.cameraIdx = cameraIdx;
	}
	public Timestamp getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
	public String getClipPath() {
		return clipPath;
	}
	public void setClipPath(String clipPath) {
		this.clipPath = clipPath;
	}
	public int getCompanyIdx() {
		return companyIdx;
	}
	public void setCompanyIdx(int companyIdx) {
		this.companyIdx = companyIdx;
	}

    

}
