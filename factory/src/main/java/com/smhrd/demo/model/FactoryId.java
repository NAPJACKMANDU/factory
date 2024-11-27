package com.smhrd.demo.model;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class FactoryId {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; // 회원 아이디
	private String pw; // 회원 비밀번호
	private String name; // 회원 이름
	private String role; // 회원 역할
	private Timestamp createdAt; // 등록 일자
	private int companyIdx; // 회사 식별자

}
