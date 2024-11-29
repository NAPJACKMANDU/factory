package com.smhrd.demo.model;

import java.sql.Timestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "tb_user")
public class FactoryMember {

    
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Timestamp getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Timestamp created_at) {
		this.created_at = created_at;
	}

	public int getCompanyIdx() {
		return companyIdx;
	}

	public void setCompanyIdx(int companyIdx) {
		this.companyIdx = companyIdx;
	}

	@Id
	@Column(nullable = false, updatable = false)
	private String id; // 회원 아이디 (고유 식별자)

    @Column(nullable = false)
    private String pw; // 회원 비밀번호

    @Column(nullable = false)
    private String name; // 회원 이름

    @Column(nullable = false)
    private String role; // 회원 역할

    @UpdateTimestamp
    private Timestamp created_at; // 생성 일자

    private int companyIdx; // 회사 식별자




	
}
