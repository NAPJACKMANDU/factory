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
@Table(name = "tb_safety_rule")


public class SafetyRulesModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long srIdx; // 수칙 식별자 
    @Column(nullable = false)
    private String srTitle; // 수칙 제목 
    @Column(nullable = false)
    private String srDesc;  // 수칙 설명 
    @UpdateTimestamp
    private Timestamp createdAt; // 수칙 등록일자
    @Column(nullable = false)
    private int companyIdx; // 회사 식별자
    
    
    
	public Long getSrIdx() {
		return srIdx;
	}
	public void setSrIdx(Long srIdx) {
		this.srIdx = srIdx;
	}
	public String getSrTitle() {
		return srTitle;
	}
	public void setSrTitle(String srTitle) {
		this.srTitle = srTitle;
	}
	public String getSrDesc() {
		return srDesc;
	}
	public void setSrDesc(String srDesc) {
		this.srDesc = srDesc;
	}
	public Timestamp getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
	public int getCompanyIdx() {
		return companyIdx;
	}
	public void setCompanyIdx(int companyIdx) {
		this.companyIdx = companyIdx;
	}

    
	
	
}
