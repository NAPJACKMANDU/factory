package com.smhrd.demo.controller;

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
    public ResponseEntity<String> uploadVideo(@RequestParam("file") MultipartFile file,  @RequestParam("cameraIndex") int cameraIndex , HttpSession session) {
        try {
        	System.out.println("여기에 오나요?");
        	session.setAttribute("cameraIndex", cameraIndex) ;
        	service.saveVideo(file, cameraIndex); // 동영상 저장 서비스 호출
        	
            return ResponseEntity.ok("동영상이 성공적으로 업로드되었습니다."); // 성공 메시지 반환
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("동영상 업로드에 실패했습니다."); // 실패 메시지 반환
        }
    }
}




