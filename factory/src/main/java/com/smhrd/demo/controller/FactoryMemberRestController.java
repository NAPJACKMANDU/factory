package com.smhrd.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.service.FactoryMemberService;

@RestController
public class FactoryMemberRestController {

	@Autowired
	FactoryMemberService service ;
	
	
	@GetMapping("/calls")
	public List<FactoryMember> getAllCall() {
		List<FactoryMember> list = service.getAllCall() ;
		if(list == null) {
			System.out.println("rest에서 null");
		}
			return list ;
	}
	
	
	@PatchMapping("/call/{idx}")
	public ResponseEntity<FactoryMember> callbyupdate(@PathVariable Long idx, @RequestBody FactoryMember member) {
	    member.setIdx(idx);
	    service.callbyupdate(member);
	    return ResponseEntity.ok(member); // 수정된 데이터를 반환
	}

	@DeleteMapping("call/{idx}")
	public String callbydelete(@PathVariable Long idx) {
		service.callbydelete(idx) ;
		return "sussess" ;
	}
}
