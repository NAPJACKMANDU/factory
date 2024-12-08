package com.smhrd.demo.model;


import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "tb_incident")
public class IncidentModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long incidentIdx;  // 사고 식별자 
	    @Column(nullable = false)
	    private  Integer cameraIdx; // 카메라 식별자 
	    @Column(nullable = false)
	    private Timestamp createdAt; // 사고 발생 시간 
	    @Column(nullable = true)
	    private String incidentType; // 사고 유형 
	    @Column(nullable = false)
	    private Long clipIdx; // 클립 식별자 
	    @Column(nullable = true)
	    private  Integer year; // 년도 
	    @Column(nullable = true)
	    private  Integer month; // 월 
	    @Column(nullable = true)
	    private  Integer day;    // 일
	    @Column(nullable = false)
	    private String incidentPath; // 사건 경로
	    @Column(nullable = false)
	    private String incidentName;  // 사건 이름
	    @Column(nullable = true)
	    private  Integer companyIdx; // 회사 식별자 
	    
	    
		public Long getIncidentIdx() {
			return incidentIdx;
		}
		public void setIncidentIdx(Long incidentIdx) {
			this.incidentIdx = incidentIdx;
		}
		public Integer getCameraIdx() {
			return cameraIdx;
		}
		public void setCameraIdx(Integer cameraIdx) {
			this.cameraIdx = cameraIdx;
		}
		public Timestamp getCreatedAt() {
			return createdAt;
		}
		public void setCreatedAt(Timestamp createdAt) {
			this.createdAt = createdAt;
		}
		public String getIncidentType() {
			return incidentType;
		}
		public void setIncidentType(String incidentType) {
			this.incidentType = incidentType;
		}
		public Long getClipIdx() {
			return clipIdx;
		}
		public void setClipIdx(Long clipIdx) {
			this.clipIdx = clipIdx;
		}
		public Integer getYear() {
			return year;
		}
		public void setYear(Integer year) {
			this.year = year;
		}
		public Integer getMonth() {
			return month;
		}
		public void setMonth(Integer month) {
			this.month = month;
		}
		public Integer getDay() {
			return day;
		}
		public void setDay(Integer day) {
			this.day = day;
		}
		public String getIncidentPath() {
			return incidentPath;
		}
		public void setIncidentPath(String incidentPath) {
			this.incidentPath = incidentPath;
		}
		public String getIncidentName() {
			return incidentName;
		}
		public void setIncidentName(String incidentName) {
			this.incidentName = incidentName;
		}
		public Integer getCompanyIdx() {
			return companyIdx;
		}
		public void setCompanyIdx(Integer companyIdx) {
			this.companyIdx = companyIdx;
		}

	

}
