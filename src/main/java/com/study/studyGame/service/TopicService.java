package com.study.studyGame.service;

import com.study.studyGame.beans.TopicBean;
import com.study.studyGame.beans.Topics;
import com.study.studyGame.repository.TopicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {

    @Autowired
    private TopicRepo topicRepo;

    public Topics retrieveTopics(){
        List<TopicBean> topics = topicRepo.getTopics();
        return new Topics(topics);
    }
}
