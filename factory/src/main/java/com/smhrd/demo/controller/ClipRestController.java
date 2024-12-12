package com.smhrd.demo.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.demo.model.ClipModel;
import com.smhrd.demo.service.ClipService;

import jakarta.servlet.http.HttpSession;

@RestController
public class ClipRestController {
	
	@Autowired
	ClipService service ;
	
	  // 파일 업로드 처리 메서드
	@PostMapping("/videos/upload")
	public ResponseEntity<String> uploadVideo(
	    @RequestParam("file") MultipartFile file,
	    @RequestParam("cameraIndex") int cameraIndex,
	    HttpSession session
	) {
	    try {
	        System.out.println("업로드 요청 수신됨: 파일 이름 - " + file.getOriginalFilename());
	        service.saveVideo(file, cameraIndex, session); // 동영상 저장 서비스 호출
	        return ResponseEntity.ok("동영상이 성공적으로 업로드되었습니다."); // 성공 메시지 반환
	    } catch (IOException e) {
	        System.err.println("파일 저장 중 오류 발생: " + e.getMessage());
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("동영상 저장 중 오류가 발생했습니다."); // 실패 메시지 반환
	    } catch (Exception e) {
	        System.err.println("업로드 처리 중 알 수 없는 오류 발생: " + e.getMessage());
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("동영상 업로드에 실패했습니다."); // 실패 메시지 반환
	    }
	}
}