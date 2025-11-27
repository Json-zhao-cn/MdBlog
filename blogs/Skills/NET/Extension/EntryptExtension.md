---
title: C# Common Encryprt Extenison method

date: 2025/11/27
tags:
 - NET
categories:
 - Skills
---

## **C# EncryprtExtenison method**
When we are building a .NET backend platform. We can add some common extension method in our platform code.
Here is a encryprt extension code. We can add some md5,hash... EncryprtExtenison to `encryption` and `decryption`.

```c#
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;

namespace Extenison
{
    public static class EncryprtExtenison
    {
        /// <summary>
        /// Generate hashed string
        /// </summary>
        /// <param name="dataString">String for hashing</param>
        /// <returns>Return hashed string</returns>
        public static string ApplyHash(string dataString)
        {
            byte[] messageBytes = Encoding.UTF8.GetBytes(dataString);

            byte[] hashValue = SHA256.HashData(messageBytes);

            return $"$2a$10${Convert.ToHexString(hashValue)}";
        }

        /// <summary>
        /// Generate hashed string
        /// </summary>
        /// <param name="dataString">String for hashing</param>
        /// <returns>Return hashed string</returns>
        public static bool TryApplyHash(string dataString,out string EncryptData)
        {
            byte[] messageBytes = Encoding.UTF8.GetBytes(dataString);

            byte[] hashValue = SHA256.HashData(messageBytes);

            EncryptData= $"$2a$10${Convert.ToHexString(hashValue)}";
            return true;
        }
    }
}

```