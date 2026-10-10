export const blinkAbi = [
  {
    "inputs": [],
    "name": "BatchTooLarge",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BountyNotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DeadlinePassed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DuplicateItemId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EmptyBatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "IncorrectFunding",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientFunds",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAnnotation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidDeadline",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidItemCount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidItemId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidReward",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidTitle",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidURI",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotContributor",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NothingToRefund",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PendingSubmissionsRemain",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrantCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReviewPeriodActive",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReviewPeriodElapsed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SubmissionAlreadyExists",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SubmissionNotPending",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Unauthorized",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "AnnotationRejected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "annotationURI",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "annotationHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "submittedAt",
        "type": "uint256"
      }
    ],
    "name": "AnnotationSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "itemCount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalAmount",
        "type": "uint256"
      }
    ],
    "name": "BatchRewardsPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "itemCount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rewardPerItem",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalFunded",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "BountyCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "RewardPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "UnusedFundsRefunded",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_BATCH_SIZE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_ITEMS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "REVIEW_PERIOD",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "approveLabel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "itemIds",
        "type": "uint256[]"
      }
    ],
    "name": "batchApproveAndPay",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "claimTimeoutReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "instructionsURI",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "datasetURI",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "itemCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rewardPerItem",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "createBounty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      }
    ],
    "name": "getBounty",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "instructionsURI",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "datasetURI",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "itemCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "rewardPerItem",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalFunded",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalPaid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalRefunded",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pendingCount",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          }
        ],
        "internalType": "struct BlinkBounty.Bounty",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "getSubmission",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "contributor",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "annotationURI",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "annotationHash",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "submittedAt",
            "type": "uint256"
          },
          {
            "internalType": "enum BlinkBounty.SubmissionStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "internalType": "struct BlinkBounty.Submission",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextBountyId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      }
    ],
    "name": "refundUnusedFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "rejectLabel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      }
    ],
    "name": "remainingFunds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "annotationURI",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "annotationHash",
        "type": "bytes32"
      }
    ],
    "name": "submitLabel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
