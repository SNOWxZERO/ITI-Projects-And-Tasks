import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";

const axiosInstance = axios.create({
  baseURL: "/api",
});

interface problemSetResponse {
  response_code: string;
  response_description: string;
  problems: problem[];
  total_count: number;
}
interface TestCase {
  input: string;
  output: string;
  is_sample: boolean;
  is_hiden: boolean;
}
export interface ProblemResponse {
  name: string;
  id: number;
  difficulty: string;
  tags: number[];
  time_limit_in_milliseconds: number;
  memory_limit_in_kilobytes: number;
  problem_statement: string;
  response_code: string;
  response_description: string;
  test_cases: TestCase[];
}
export interface problem {
  id: number;
  name: string;
  tags: number[];
  difficulty: string;
}
export interface submissions{
  problem_id: number;
  problem_name: string;
  language: string;
  verdict: string;
  time_taken_in_milliseconds: number;
  memory_taken_in_kilobytes: number;
  submission_date: string;
}
export interface submissionResponse {
  verdict: string;
  time_taken_in_milliseconds: number;
  memory_taken_in_kilobytes: number;
}
export interface TagMap {
  [tagId: number]: string;
}

const cookie = new Cookies();

class Problems {
  private static instance: Problems;

  public static getInstance(): Problems {
    if (!Problems.instance) {
      Problems.instance = new Problems();
    }
    return Problems.instance;
  }

  async getProblemList(
    skip: number,
    count: number
  ): Promise<problemSetResponse> {
    const token = cookie.get("Bearer");

    const response = await axiosInstance.get(
      `api/v1/problems?skip=${skip}&count=${count}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.response_code !== "6") {
      throw new Error("Failed to get problems");
    }
    return response.data;
  }

  async getProblem(id: number): Promise<ProblemResponse> {
    const token = cookie.get("Bearer");

    const response = await axiosInstance.get(`api/v1/problems/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async createProblem(
    name: string,
    difficulty: string,
    tags: number[],
    time_limit_in_milliseconds: number,
    memory_limit_in_kilobytes: number,
    problem_statement: string,
    test_cases: TestCase[]
  ) {
    const token = cookie.get("Bearer");
    const response = await axiosInstance.post(
      `api/v1/problems`,
      {
        name,
        difficulty,
        tags,
        time_limit_in_milliseconds,
        memory_limit_in_kilobytes,
        problem_statement,
        test_cases,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }

  async submitCode(
    problem_id: number,
    user_name: string,
    code: string,
    language: number
  ): Promise<submissionResponse> {
    const token = cookie.get("Bearer");
    const response = await axiosInstance.post(
      `api/v1/submissions`,
      {
        problem_id,
        user_name,
        language,
        code,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  async getSubmissions(): Promise<submissions[]>{
    const token = cookie.get("Bearer");
    const username = cookie.get("Username");
    const response = await axiosInstance.get(`api/v1/submissions/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async getTags(): Promise<TagMap> {
    const token = cookie.get("Bearer");
    const tagMap: TagMap = {};

    const response = await axiosInstance.get("api/v1/tags", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    for (const tag of response.data) {
      tagMap[tag.tagId] = tag.name;
    }
    return tagMap;
  }
}

const problemsInstance = Problems.getInstance();
export default problemsInstance;
