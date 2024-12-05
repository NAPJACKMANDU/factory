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
@Table(name = "tb_cctv")

public class CCTVModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cameraIdx; // 카메라 식별자
	@UpdateTimestamp
	private Timestamp installedAt; // 설치 날짜
	@Column(nullable = false)
	private String cameraName; // 카메라 이름
	@Column(nullable = false)
	private int companyIdx; // 회사 식별자
	public Long getCameraIdx() {
		return cameraIdx;
	}
	public void setCameraIdx(Long cameraIdx) {
		this.cameraIdx = cameraIdx;
	}
	public Timestamp getInstalledAt() {
		return installedAt;
	}
	public void setInstalledAt(Timestamp installedAt) {
		this.installedAt = installedAt;
	}
	public String getCameraName() {
		return cameraName;
	}
	public void setCameraName(String cameraName) {
		this.cameraName = cameraName;
	}
	public int getCompanyIdx() {
		return companyIdx;
	}
	public void setCompanyIdx(int companyIdx) {
		this.companyIdx = companyIdx;
	}
	
	

}