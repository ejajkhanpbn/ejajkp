import {expect,test} from '@playwright/test';

test('GET request to API', async ({request}) => {
  const toolId = 6483;  
  const response = await request.get(`https://simple-tool-rental-api.click/tools/${toolId}`);
  expect(response.status()).toBe(200);
  const data = await response.json();
  const expectedData = {
    "id": 6483,
    "category": 'trailers',
    "name": 'Single Axle Dump Trailer 2,990 lbs',
    "manufacturer": 'PJ Trailers',
    "price": 97.65,
    "current-stock": 2,
    "inStock": true
  };
  const id = data.id;
  expect(id).toBe(toolId);
  expect(data).toEqual(expectedData);   
  console.log(data);
});

test('GET request to API Category', async ({request}) => {
  const Category = 'trailers';  
  const response = await request.get('https://simple-tool-rental-api.click/tools', {
    params: {
      category: Category
    }
  });
  expect(response.status()).toBe(200);
  const data = await response.json();  
  for (const tool of data) {
    expect(tool.category).toBe(Category);
  }
  console.log(data);
});

test('Token Generation', async ({request}) => {
  const requestBody = {
   "clientName": "Postman App",
   "clientEmail": "valentin123day@example.com"
}
    const response = await request.post('https://simple-tool-rental-api.click/api-clients', {
    data: requestBody
  });
  expect(response.status()).toBe(201);
  const responseData = await response.json();
  console.log(responseData);
});


test('POST request to API', async ({request}) => {

  const accessToken= '82cf30eb99e18ff47ea3016608ad68610a8bf41c5827c3384757df26f4df38d8';
  const requestBody = {
      "toolId": 1643,
      "customerName": "John Doe"
  };
   const response = await request.post('https://simple-tool-rental-api.click/orders',{
    // 1. Send the Bearer token in the headers
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    },
    // 2. Send the request parameters in the data payload
    data: {
      toolId: 1709,
      customerName: 'John Doe',
      comment: 'Please deliver to the back entrance.'
    }
  });
  expect(response.status()).toBe(201);
  const responseData = await response.json();
  expect(responseData).not.toMatchObject(requestBody);
  console.log(responseData);
});

test('Patch request to API', async ({request}) => {
  const accessToken= '82cf30eb99e18ff47ea3016608ad68610a8bf41c5827c3384757df26f4df38d8';
  const orderId = 'nFkW5RKvWVLfO36bgR6uY';
  const response = await request.patch(`https://simple-tool-rental-api.click/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    },
    data: {
      customerName: 'Hamid Smith',
      comment: 'Please deliver to the front entrance.'
    }
  });
  expect(response.status()).toBe(204);
  const body = await response.body();
  expect(body.length).toBe(0); // Assert that the response body is empty
  console.log('Patch request successful. Response body is empty.');
});

test('Delete request to API', async ({request}) => {
  const accessToken= '82cf30eb99e18ff47ea3016608ad68610a8bf41c5827c3384757df26f4df38d8';
  const orderId= 'sGKtGQzani4SExb0uyJTJ';
  const response = await request.delete(`https://simple-tool-rental-api.click/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });
  expect(response.status()).toBe(204);
  const body = await response.body();
  expect(body.length).toBe(0); // Assert that the response body is empty
  console.log('Delete request successful. Response body is empty.');
});


test('Get a single tool with its manual', async ({ request }) => {
  // 1. Define your path parameter
  const toolId = 6483; 

  // 2. Make the GET request, embedding the path parameter in the URL string
  const response = await request.get(`https://simple-tool-rental-api.click/tools/${toolId}`, {
    // 3. Define your query parameters in the 'params' object
    params: {
      'user-manual': true // This will append ?user-manual=true to the URL
    }
  });

  // Verify the request was successful
  expect(response.status()).toBe(200);

  // Note: Since this specific query asks for a PDF, you might handle the response 
  // differently than standard JSON (e.g., using response.body() to save the file).
  console.log('Request successful!');
});

test('Get Order for Authorized User', async ({ request }) => {
  const accessToken = '82cf30eb99e18ff47ea3016608ad68610a8bf41c5827c3384757df26f4df38d8';
  const response = await request.get('https://simple-tool-rental-api.click/orders', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});

test('Get request for specific tool id', async ({ request }) => {
  const toolId = 6483; // Replace with the specific tool ID you want to retrieve
  const response = await request.get(`https://simple-tool-rental-api.click/tools/${toolId}`, {
    params: {
      'user-manual': true // This will append ?user-manual=true to the URL
    }
  });
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
  const dataMap=new Map(Object.entries(data));
  expect(dataMap.get('id')).toBe(toolId);
  expect(dataMap.get('category')).toBe('trailers');
  expect(dataMap.get('name')).toBe('Single Axle Dump Trailer 2,990 lbs');
  expect(dataMap.get('manufacturer')).toBe('PJ Trailers');
  expect(dataMap.get('price')).toBe(97.65);
  expect(dataMap.get('current-stock')).toBe(2);
  expect(dataMap.get('inStock')).toBe(true);
});