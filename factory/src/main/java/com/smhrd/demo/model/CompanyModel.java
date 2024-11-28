package com.smhrd.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "tb_company")
public class CompanyModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer companyIdx; // 회사 식별자
	@Column(nullable = false)
	private String companyName; // 회사 명
	@Column(nullable = false)
	private String companyAddr; // 회사 주소
	@Column(nullable = false)
	private String companyTel; // 회사 연락처

}
