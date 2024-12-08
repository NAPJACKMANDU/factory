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
import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.repo.ClipRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;

@Service
public class ClipService {

	
	@Autowired
	ClipRepository rep ;
	
	   @Value("${video.storage.path}") // application.properties 파일에서 경로 가져오기
	    private String videoStoragePath; // 동영상 파일을 저장할 경로
	   
	   public void saveVideo(MultipartFile file, int cameraIndex, HttpSession session) throws IOException {

	        // 저장할 파일 이름 생성
	        String clipName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
	        Path clipPath = Paths.get(videoStoragePath, clipName).normalize(); // 경로 정리
	        System.out.println("Saving file to: " + clipPath.toAbsolutePath());
	        
	        
	        // 디렉토리가 없는 경우 생성
	        Path dirPath = clipPath.getParent();
	        System.out.println("Directory path to create: " + dirPath.toAbsolutePath()); // 디렉토리 경로 가져오기
	        if (!Files.exists(dirPath)) {
	            try {
	                Files.createDirectories(dirPath);
	                System.out.println("Created directory: " + dirPath.toAbsolutePath());
	            } catch (IOException e) {
	                System.out.println("Error creating directory: " + e.getMessage());
	                throw e;
	            }
	        }
	        // 파일 저장
	        try {
	            Files.copy(file.getInputStream(), clipPath, StandardCopyOption.REPLACE_EXISTING);
	            System.out.println("File saved successfully: " + clipPath.toAbsolutePath());
	        } catch (IOException e) {
	            System.out.println("Error saving file: " + e.getMessage());
	            e.printStackTrace();
	        }
	
	        FactoryMember member = (FactoryMember) session.getAttribute("member") ;
	        
	        // 데이터베이스에 비디오 클립 정보 저장 
	        ClipModel clip = new ClipModel();
	        clip.setClipName(clipName); // 클립 이름 설정
	        clip.setClipPath(clipPath.toString()); // 카메라 식별자 설정
	        clip.setClipSize(file.getSize()) ;
	        clip.setCameraIdx(cameraIndex);
	        clip.setCreatedAt(new Timestamp(System.currentTimeMillis())); // 현재 시간으로 생성 일자 설정
	        clip.setCompanyIdx(member.getCompanyIdx());
	        rep.save(clip); // 데이터베이스에 저장
	    }
	}