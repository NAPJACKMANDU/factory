package com.smhrd.demo.model;

import java.sql.Timestamp;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
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
@Table(name = "tb_user")
@EntityListeners(AuditingEntityListener.class)
public class FactoryMember {

    
	@Id
	@Column(nullable = false, updatable = false)
	private String id; // 회원 아이디 (고유 식별자)

    @Column(nullable = false)
    private String pw; // 회원 비밀번호

    @Column(nullable = false)
    private String name; // 회원 이름

    @Column(nullable = false)
    private String role; // 회원 역할

    @CreationTimestamp
    private Timestamp created_at; // 생성 일자

    private int companyIdx; // 회사 식별자

	
}
