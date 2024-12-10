package com.smhrd.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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
	    return ResponseEntity.ok(member); 	// 수정된 데이터를 반환
	}

	@DeleteMapping("call/{idx}")
	public String callbydelete(@PathVariable Long idx) {
		service.callbydelete(idx) ;
		return "sussess" ;
	}

	@GetMapping("/api/check-id")
	@ResponseBody
	public Map<String, Boolean> checkId(@RequestParam String id) {
	    System.out.println("요청된 아이디: " + id);
	    Map<String, Boolean> response = new HashMap<>();
	    boolean isAvailable = !service.isIdTaken(id); // 서비스에서 중복 체크
	    response.put("available", isAvailable);
	    return response;
	}
	
	@PatchMapping("update/{idx}")
	public ResponseEntity<String> updateMember(@PathVariable("idx") Long idx, @ModelAttribute FactoryMember member) {
	    member.setIdx(idx); // URL의 idx 값을 설정
	    service.updatemember(member);
	    return ResponseEntity.ok("success"); // 성공 메시지 반환
	}

}
