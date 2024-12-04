package com.smhrd.demo.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.demo.model.ClipModel;
import com.smhrd.demo.repo.ClipRepository;

@Service
public class ClipService {

	
	@Autowired
	ClipRepository rep ;
	
	   @Value("${video.storage.path}") // application.properties 파일에서 경로 가져오기
	    private String videoStoragePath; // 동영상 파일을 저장할 경로
	   
	   // 동영상 파일을 저장하는 메서드
	    public void saveVideo(MultipartFile file) throws IOException {
	        // 저장할 파일 이름 생성 (현재 시간 + 원본 파일 이름)
	        String clipName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
	        Path clipPath = Paths.get(videoStoragePath, clipName); // 파일 경로 생성

	        // 파일을 로컬 디스크에 저장
	        Files.copy(file.getInputStream(), clipPath, StandardCopyOption.REPLACE_EXISTING);

	        // 데이터베이스에 비디오 클립 정보 저장
	        ClipModel clip = new ClipModel();
	        clip.setClipName(clipName); // 클립 이름 설정
	        clip.setClipPath(clipPath.toString()); // 카메라 식별자 설정
	        clip.setCreatedAt(new Timestamp(System.currentTimeMillis())); // 현재 시간으로 생성 일자 설정

	        rep.save(clip); // 데이터베이스에 저장
	    }
	}