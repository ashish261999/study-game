package com.study.studyGame.controller;


import com.study.studyGame.beans.Topics;
import com.study.studyGame.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping("/topics")
    public Topics hello(){
        return topicService.retrieveTopics();
    }
}
