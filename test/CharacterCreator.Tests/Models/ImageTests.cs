﻿using CharacterCreator.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CharacterCreator.Tests.Models
{
    public class ImageTests
    {
        private string TestString { get; set; }
        private byte[] TestBytes { get; set; }
        public ImageTests()
        {
            TestString = @"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";
            TestBytes = Convert.FromBase64String(TestString);
        }

        [Fact]
        public void GalleryImageTest()
        {
            var TestImage = new GalleryImage();
            Assert.Equal(@"No Image Found", TestImage.Src);
            Assert.False(TestImage.IsProfile);

            TestImage = new GalleryImage()
            {
                IsProfile = true
            };
            Assert.True(TestImage.IsProfile);

            TestImage = new GalleryImage(new MemoryStream(TestBytes));
            Assert.Equal(string.Concat("data:image/jpeg;base64,", TestString), TestImage.Src);
        }

        [Fact]
        public void InventoryImageTest()
        {
            //Test Create empty image
            var TestImage = new InventoryImage();
            Assert.Equal(@"No Image Found", TestImage.Src);

            //Test Create Image from Memory Stream
            TestImage = new InventoryImage(new MemoryStream(TestBytes));
            Assert.Equal(string.Concat("data:image/jpeg;base64,", TestString), TestImage.Src);
        }
    }
}
