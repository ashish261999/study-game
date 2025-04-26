package com.study.studyGame.repository;

import com.study.studyGame.beans.TopicBean;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepo {
    public List<TopicBean> getTopics();
}
