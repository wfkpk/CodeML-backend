import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

//python id 92
@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) {}

  async fun() {
    const userCode = `
import numpy
def relu(x):
    return max(0, x)`; // User-provided Python code
    const defaultCode = `
def relu(x):
    return max(0, x)

if __name__ == "__main__":
    import sys
    input = sys.stdin.read().strip()
    x = int(input)
    
    # Compute the ReLU result
    result = relu(x)
    
    # Print the result
    print(result)
    `;

    const code = userCode + defaultCode;
    // Define the request payload with the updated Python code
    const requestPayload = {
      source_code: code,
      language_id: 25,
      stdin: '5', // Example input to the program
      expected_output: '5\n', // Expected output for the provided input
      memory_limit: [128000000], // Memory limit for the program
      cpu_time_limit: 2, // CPU time limit for the program
    };

    // Set up the request options
    const options = {
      method: 'POST',
      url: 'https://judge0-extra-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=true',
      headers: {
        'x-rapidapi-key': 'd2f0b53222mshc773209e42c5da0p1a821fjsn8f3a3a3444a9',
        'x-rapidapi-host': 'judge0-extra-ce.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: requestPayload,
    };

    try {
      // Send the request to the Judge0 API
      const response = await axios(options);
      return response.data;
    } catch (error) {
      console.error('Error submitting solution:', error);
      throw new Error('Error submitting solution');
    }
  }
}
