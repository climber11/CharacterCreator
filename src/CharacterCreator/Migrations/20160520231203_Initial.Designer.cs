using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using CharacterCreator.Services;

namespace CharacterCreator.Migrations
{
    [DbContext(typeof(StorageContext))]
    [Migration("20160520231203_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CharacterCreator.Models.Character", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Gender");

                    b.Property<string>("Name");

                    b.Property<string>("Race");

                    b.HasKey("id");
                });
        }
    }
}
