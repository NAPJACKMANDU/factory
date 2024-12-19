package com.smhrd.demo.service;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.demo.model.FactoryMember;
import com.smhrd.demo.model.SafetyRulesModel;
import com.smhrd.demo.repo.SafetyRulesRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class SafetyRulesService {

    @Autowired
    SafetyRulesRepository rep;

    // 파일이 저장될 디렉토리 경로
    private final String UPLOAD_DIR = "주소";
    private String file1 = "file/" ;
    
    public List<SafetyRulesModel> getAllSafetyRules() {
        return rep.findAll();
    }
    
    public void safetyRulesdata(MultipartFile file, SafetyRulesModel safety, HttpSession session) throws IOException {
    	  System.out.println("srTitle: " + safety.getSrTitle());
    	    System.out.println("srDesc: " + safety.getSrDesc());
    	    
        // 원본 파일 이름 가져오기
        String originalFilename = file.getOriginalFilename();
        
        // 고유한 파일 이름 생성 (시간 추가)
        String uniqueFilename = System.currentTimeMillis() + "_" + originalFilename;
        File savepath = new File(UPLOAD_DIR + uniqueFilename);
        String pathfile = file1+uniqueFilename ;
        try {
            // 파일을 서버에 저장
            file.transferTo(savepath);
        } catch (IOException e) {
            System.err.println("파일 저장 중 오류 발생: " + e.getMessage());
            throw e;
        }

        // 세션에서 사용자 정보 가져오기
        FactoryMember member = (FactoryMember) session.getAttribute("member");
      

        // 데이터베이스에 저장할 객체 생성
        SafetyRulesModel safetyRule = new SafetyRulesModel();
        safetyRule.setCreatedAt(new Timestamp(System.currentTimeMillis())); // 생성 시간 설정
        safetyRule.setSafetyPath(pathfile.toString()); // 파일 경로 저장
        System.out.println(savepath.getAbsolutePath());
        safetyRule.setCompanyIdx(member.getCompanyIdx()); // 회사 ID 설정
        safetyRule.setSrTitle(safety.getSrTitle());
        safetyRule.setSrDesc(safety.getSrDesc());
        // 데이터베이스에 저장
        rep.save(safetyRule);
       
    }
    

}
